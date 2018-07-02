@extends('layouts/admin/default')

@section('title')
    @lang('cms.page_list')
@stop

@section('header_styles')

    <!--page level css -->

    <link rel="stylesheet" href="{{ Config('constants.admin_css_url') }}dataTables.bootstrap.css"/>
    <!-- end of page level css -->
    
@stop

@section('content')
    <div class="content">
        @if(Session::has('sucPageg'))
        <div class="alert alert-success alert-dismissable margin5">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
            <strong>@lang('common.success'):</strong> {{ Session::get('succMsg') }}
        </div>
        @elseif(Session::has('errorMsg'))
        <div class="alert alert-danger alert-dismissable margin5">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
            <strong>@lang('common.error'):</strong> {{ Session::get('errorMsg') }}
        </div>    
        @endif  
        <div class="header-title">
            <h1 class="title">@lang('blog.title')</h1>
             @if($permission_arr['add'] === true)
            <div class="pull-right">
                <a class="btn" href="{{ action('Admin\Blogs\BlogController@create') }}"> @lang('common.create_new')</a> 
            </div>
          
            @endif
        </div>

              
        <!-- Main content -->         
           
        <div class="content-wrap ">
            
            <div id="table_wrapper" class="dataTables_wrapper form-inline dt-bootstrap no-footer">                                                
                <table class="table table-bordered " id="table">
                    <thead>
                        <tr class="filters">
                            <th>@lang('common.sno')</th>
                            <th>@lang('cms.title')</th>
                            <th>@lang('cms.url_key')</th>
                            <th>@lang('cms.comment')</th>
                            <th>@lang('cms.features')</th>
                            <th>@lang('cms.publish')</th>
                            <th>@lang('common.created_at')</th>
                            <th>@lang('common.last_updated')</th>
                            <th>@lang('common.status')</th>
                            <th>@lang('common.actions')</th>
                        </tr>
                    </thead>
                    <tbody>
                    @foreach ($page_dtls as $key => $page_dtl)
                    <?php 
                    // echo "<pre>"; print_R($permission_arr); die;
                    ?>
                    
                        <tr>
                            <td>{{ ++$key }}</td>
                            <td>{{ $page_dtl['title'] }}</td>
                            <td>{{ $page_dtl['url'] }}</td>
                            <td>{{ $page_dtl['comment'] }}</td>
                            <td>{{ $page_dtl['features'] }}</td>
                            <td>{{ $page_dtl['publish'] }}</td>
                            <td>{{ $page_dtl['created_at'] }}</td>
                            <td>{{ $page_dtl['updated_at'] }}</td>
                            <td>
                            <a id="status_{{ $page_dtl['id'] }}" href="javascript:void(0);" onclick="callForAjax('{{ action('Admin\Blogs\BlogController@changeStatus', $page_dtl['id']) }}', 'status_{{ $page_dtl['id'] }}')">
                            {{ $page_dtl['status'] }}
                            </a>
                            </td>
                            <td>
                                @if($permission_arr['edit'] === true)
                                    <a class="btn-grey" href="{{ action('Admin\Blogs\BlogController@edit', $page_dtl['id']) }}">@lang('common.edit')</a>
                                @endif

                                @if($permission_arr['delete'] === true) 
                                <form method="post" action="{{ action('Admin\Blogs\BlogController@destroy', $page_dtl['id']) }}" onsubmit="return confirm('Are you sure to delete this record ?');" class="inblock"> 
                                    {{ csrf_field() }}
                                    {{ method_field('DELETE') }}                             
                                    <a class="btn-grey" onclick="$(this).closest('form').submit();" data-toggle="modal">
                                       @lang('common.delete')
                                    </a>
                                </form>
                                @endif
                            </td>
                        </tr>
                     @endforeach  
                     </tbody>
                </table>
            </div>
            
        </div>
            

    </div>
@stop

@section('footer_scripts')

    <!-- begining of page level js -->

    <script src="{{ Config('constants.admin_js_url') }}jquery.dataTables.js"></script>
    <script src="{{ Config('constants.admin_js_url') }}dataTables.bootstrap.js"></script>
    <script>
    $(document).ready(function() {
        $('#table').dataTable();
    });
    </script>
    <!-- end of page level js -->
    
@stop
